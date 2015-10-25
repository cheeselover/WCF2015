package es.humansvszombi.humansvszombies;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.TextView;

import butterknife.Bind;
import butterknife.ButterKnife;
import es.humansvszombi.humansvszombies.models.Participation;
import es.humansvszombi.humansvszombies.services.ParticipationService;
import es.humansvszombi.humansvszombies.services.UserService;
import retrofit.Callback;
import retrofit.Response;
import retrofit.Retrofit;

public class MainActivity extends AppCompatActivity {

    @Bind(R.id.status)
    TextView mStatus;

    private ParticipationService mParticipationService;
    private UserService mUserService;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        ButterKnife.bind(this);

        mUserService = HumansVsZombies.getUserService();
        mParticipationService = HumansVsZombies.getParticipationService();

        mUserService.active_game(HumansVsZombies.getCurrentUser().getId()).enqueue(new Callback<Participation>() {
            @Override
            public void onResponse(Response<Participation> response, Retrofit retrofit) {
                mStatus.setText("You are a " + response.body().getUserType());
            }

            @Override
            public void onFailure(Throwable t) {

            }
        });
    }
}
