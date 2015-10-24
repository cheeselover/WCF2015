package es.humansvszombi.humansvszombies;

import android.content.Intent;
import android.content.SharedPreferences;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.widget.Button;
import android.widget.EditText;

import butterknife.Bind;
import butterknife.ButterKnife;
import butterknife.OnClick;
import es.humansvszombi.humansvszombies.models.User;
import es.humansvszombi.humansvszombies.services.UserService;
import retrofit.Callback;
import retrofit.Response;
import retrofit.Retrofit;

public class LoginActivity extends AppCompatActivity {

    @Bind(R.id.email)
    EditText mEmail;
    @Bind(R.id.password)
    EditText mPassword;
    @Bind(R.id.login_button)
    Button mButton;

    private UserService mUserService;
    private SharedPreferences mSharedPreferences;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        ButterKnife.bind(this);
        mUserService = HumansVsZombies.getRetrofit().create(UserService.class);
        mSharedPreferences = getSharedPreferences("es.humansvszombi.humansvszombies", MODE_PRIVATE);
        if (mSharedPreferences.contains("token")) {
            String token = mSharedPreferences.getString("token", "");
            mUserService.me("Token " + token).enqueue(new Callback<User>() {
                @Override
                public void onResponse(Response<User> response, Retrofit retrofit) {
                    HumansVsZombies.setCurrentUser(response.body());
                    Log.d("LoginActivity", "Logged in with store token");
                    startMain();
                }

                @Override
                public void onFailure(Throwable t) {
                    Log.e("LoginActivity", "Error fetching me with token", t);
                }
            });
        }
    }

    void startMain() {
        Intent intent = new Intent(this, MainActivity.class);
        intent.setFlags(intent.getFlags() | Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);
        startActivity(intent);
    }

    @OnClick(R.id.login_button)
    void onLogin() {
        mUserService.login(mEmail.getText().toString(), mPassword.getText().toString()).enqueue(new Callback<User>() {
            @Override
            public void onResponse(Response<User> response, Retrofit retrofit) {
                User me = response.body();
                HumansVsZombies.setCurrentUser(me);
                mSharedPreferences.edit().putString("token", me.getAuthToken()).apply();
                Log.d("LoginActivity", "Logged in with username/password");
                startMain();
            }

            @Override
            public void onFailure(Throwable t) {
                Log.e("login", "error", t);
            }
        });
    }
}
