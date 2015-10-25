package es.humansvszombi.humansvszombies;

import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.nfc.NdefMessage;
import android.nfc.NfcAdapter;
import android.nfc.NfcEvent;
import android.os.Vibrator;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.widget.TextView;

import org.ndeftools.Message;
import org.ndeftools.externaltype.AndroidApplicationRecord;
import org.ndeftools.externaltype.ExternalTypeRecord;
import org.ndeftools.externaltype.GenericExternalTypeRecord;

import java.nio.charset.Charset;

public class HelloWorldNFCActivity extends AppCompatActivity implements NfcAdapter.CreateNdefMessageCallback, NfcAdapter.OnNdefPushCompleteCallback {
    /** Called when the activity is first created. */

    private static String TAG = HelloWorldNFCActivity.class.getName();

    protected NfcAdapter nfcAdapter;
    protected PendingIntent nfcPendingIntent;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Log.d(TAG, "onCreate");

        setContentView(R.layout.nfc);
        nfcAdapter = NfcAdapter.getDefaultAdapter(this);
        nfcPendingIntent = PendingIntent.getActivity(this, 0, new Intent(this, this.getClass()).addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP), 0);
        nfcAdapter.setNdefPushMessageCallback(this, this);
    }

    public void enableForegroundMode() {
        IntentFilter tagDetected = new IntentFilter(NfcAdapter.ACTION_TAG_DISCOVERED);
        IntentFilter[] writeTagFilters = new IntentFilter[]{tagDetected};
        nfcAdapter.enableForegroundDispatch(this, nfcPendingIntent, writeTagFilters, null);
    }

    public void disableForegroundMode() {
        nfcAdapter.disableForegroundDispatch(this);
    }

    @Override
    protected void onResume() {
        super.onResume();

        Log.d(TAG, "onResume");

        // enableForegroundMode(); // task 2
    }

    @Override
    protected void onPause() {
        super.onPause();

        Log.d(TAG, "onPause");

        // disableForegroundMode(); // task 2
    }

    @Override
    public void onNewIntent(Intent intent) { // task 2 and 3
        Log.d(TAG, "onNewIntent");
        if (NfcAdapter.ACTION_TAG_DISCOVERED.equals(intent.getAction())) {
            TextView textView = (TextView) findViewById(R.id.nfc_text);
            textView.setText("hello nfc");
            vibrate();
        }
    }

    @Override
    public NdefMessage createNdefMessage(NfcEvent event) {

        Log.d(TAG, "createNdefMessage");

        Message message = new Message();
        AndroidApplicationRecord aar = new AndroidApplicationRecord("es.humansvszombi.humansvszombies");
        message.add(aar);

        ExternalTypeRecord record = new GenericExternalTypeRecord("es.humansvszombi.humansvszombies.participation", "participation", "This is my magic payload".getBytes(Charset.forName("UTF-8")));
        message.add(record);

        return message.getNdefMessage();
    }

    @Override
    public void onNdefPushComplete(NfcEvent arg0) {
        Log.d(TAG, "onNdefPushComplete");


        throw new IllegalArgumentException("Not implemented"); // task 5
    }

    /**
     * Activate device vibrator for 500 ms
     * */

    private void vibrate() {
        Log.d(TAG, "vibrate");

        Vibrator vibe = (Vibrator) getSystemService(Context.VIBRATOR_SERVICE) ;
        vibe.vibrate(500);
    }

    /**
     * Converts the byte array to HEX string.
     *
     * @param buffer
     *            the buffer.
     * @return the HEX string.
     */
    public String toHexString(byte[] buffer) {
        StringBuilder sb = new StringBuilder();
        for(byte b: buffer)
            sb.append(String.format("%02x ", b&0xff));
        return sb.toString().toUpperCase();
    }

}