package es.humansvszombi.humansvszombies;

import android.app.PendingIntent;
import android.content.Intent;
import android.content.IntentFilter;
import android.nfc.FormatException;
import android.nfc.NdefMessage;
import android.nfc.NfcAdapter;
import android.nfc.tech.NfcA;
import android.os.Parcelable;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.widget.TextView;

import org.ndeftools.Message;
import org.ndeftools.Record;
import org.ndeftools.externaltype.GenericExternalTypeRecord;

import java.nio.charset.Charset;
import java.util.List;

import butterknife.Bind;
import butterknife.ButterKnife;
import butterknife.OnClick;
import es.humansvszombi.humansvszombies.models.Participation;
import es.humansvszombi.humansvszombies.models.User;
import es.humansvszombi.humansvszombies.services.ParticipationService;
import es.humansvszombi.humansvszombies.services.UserService;
import retrofit.Callback;
import retrofit.Response;
import retrofit.Retrofit;

public class MainActivity extends AppCompatActivity {

    @Bind(R.id.status)
    TextView mStatus;

    protected NfcAdapter nfcAdapter;
    protected PendingIntent nfcPendingIntent;

    private ParticipationService mParticipationService;
    private UserService mUserService;
    private int mParticipationId;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Log.d("ONCREATEEEEE", "hai");
        setContentView(R.layout.activity_main);
        ButterKnife.bind(this);

        nfcAdapter = NfcAdapter.getDefaultAdapter(this);
        nfcPendingIntent = PendingIntent.getActivity(this, 0, new Intent(this, this.getClass()).addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP), 0);

        mUserService = HumansVsZombies.getUserService();
        mParticipationService = HumansVsZombies.getParticipationService();

        HumansVsZombies.getUserService().me().enqueue(new Callback<User>() {
            @Override
            public void onResponse(Response<User> response, Retrofit retrofit) {
                mUserService.active_game(response.body().getId()).enqueue(new Callback<Participation>() {
                    @Override
                    public void onResponse(Response<Participation> response, Retrofit retrofit) {
                        mStatus.setText("You are a " + response.body().getUserType());
                        mParticipationId = response.body().getId();
                    }

                    @Override
                    public void onFailure(Throwable t) {

                    }
                });
            }

            @Override
            public void onFailure(Throwable t) {

            }
        });


        Intent intent = getIntent();
        if(intent.hasExtra(NfcAdapter.EXTRA_TAG)) {
            Log.d("EXTRAAAAAA", "happensS");
            receiveMessage(intent);
        }
    }

    @Override
    public void onNewIntent(Intent intent) {
        if (NfcAdapter.ACTION_TAG_DISCOVERED.equals(intent.getAction())) {
            receiveMessage(intent);
        }
    }

    private void receiveMessage(Intent intent) {
        Parcelable[] messages = intent.getParcelableArrayExtra(NfcAdapter.EXTRA_NDEF_MESSAGES);
        if (messages != null) {
            NdefMessage ndefMessage = (NdefMessage) messages[0];
            try {
                List<Record> records = new Message(ndefMessage);
                for (Record record : records) {
                    Log.d("record", "found record " + record.getKey() + " of class " + record.getClass().getName());
                    if (record instanceof GenericExternalTypeRecord) {
                        GenericExternalTypeRecord externalTypeRecord = (GenericExternalTypeRecord) record;
                        String data = new String(externalTypeRecord.getData(), Charset.forName("UTF-8"));
                        Log.d("record", "got data: " + data);
                    }
                }
            } catch (FormatException e) {
                e.printStackTrace();
            }
        }
    }

    @OnClick(R.id.taggedButton)
    void onTag() {
        Intent intent = new Intent(this, BeamActivity.class);
        intent.putExtra("participationId", mParticipationId);
        startActivity(intent);
    }

    @Override
    protected void onPause() {
        super.onPause();
        nfcAdapter.disableForegroundDispatch(this);
    }

    @Override
    protected void onResume() {
        super.onResume();
        IntentFilter tagDetected = new IntentFilter(NfcAdapter.ACTION_TAG_DISCOVERED);
        IntentFilter[] writeTagFilters = new IntentFilter[]{tagDetected};
        nfcAdapter.enableForegroundDispatch(this, nfcPendingIntent, writeTagFilters, null);
    }
}
