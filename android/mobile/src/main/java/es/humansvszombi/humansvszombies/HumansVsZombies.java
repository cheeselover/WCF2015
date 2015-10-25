package es.humansvszombi.humansvszombies;

import android.app.Application;
import android.app.DownloadManager;
import android.content.SharedPreferences;
import android.util.Log;

import com.google.gson.FieldNamingPolicy;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.squareup.okhttp.Interceptor;
import com.squareup.okhttp.OkHttpClient;
import com.squareup.okhttp.Request;
import com.squareup.okhttp.Response;

import java.io.IOException;

import es.humansvszombi.humansvszombies.models.Participation;
import es.humansvszombi.humansvszombies.models.User;
import es.humansvszombi.humansvszombies.services.ParticipationService;
import es.humansvszombi.humansvszombies.services.UserService;
import retrofit.Callback;
import retrofit.GsonConverterFactory;
import retrofit.Retrofit;

/**
 * Created by daniel on 2015-10-24.
 */
public class HumansVsZombies extends Application {
    private static Retrofit sRetrofit;
    private static User sCurrentUser;
    private static String sCurrentUserAuthToken;
    private static UserService mUserService;
    private static ParticipationService mParticipationService;

    @Override
    public void onCreate() {
        super.onCreate();

        mUserService = HumansVsZombies.getUserService();
        SharedPreferences sp = getSharedPreferences("es.humansvszombi.humansvszombies", MODE_PRIVATE);
        if (sp.contains("token")) {
            String token = sp.getString("token", "");
            Log.d("APPLICATIONNNNNN", token);
            setCurrentUserAuthToken(token);
        }
    }

    public static Retrofit getRetrofit() {
        if(sRetrofit == null) {
            Gson gson = new GsonBuilder()
                    .setFieldNamingPolicy(FieldNamingPolicy.LOWER_CASE_WITH_UNDERSCORES)
                    .create();
            OkHttpClient client = new OkHttpClient();
            client.interceptors().add(new Interceptor() {
                @Override
                public Response intercept(Chain chain) throws IOException {
                    Request request = chain.request();
                    if (sCurrentUserAuthToken != null) {
                        Request newRequest = request.newBuilder()
                                .addHeader("Authorization", "Token " + sCurrentUserAuthToken)
                                .build();
                        return chain.proceed(newRequest);
                    }
                    return chain.proceed(request);
                }
            });
            sRetrofit = new Retrofit.Builder()
                    .baseUrl("http://172.31.11.157:3000")
                    .addConverterFactory(GsonConverterFactory.create(gson))
                    .client(client)
                    .build();
        }
        return sRetrofit;
    }

    public static UserService getUserService() {
        if(mUserService == null) {
            mUserService = getRetrofit().create(UserService.class);
        }
        return mUserService;
    }

    public static ParticipationService getParticipationService() {
        if(mParticipationService == null) {
            mParticipationService = getRetrofit().create(ParticipationService.class);
        }
        return mParticipationService;
    }

    public static String getCurrentUserAuthToken() {
        return sCurrentUserAuthToken;
    }

    public static void setCurrentUserAuthToken(String sCurrentUserAuthToken) {
        HumansVsZombies.sCurrentUserAuthToken = sCurrentUserAuthToken;
    }
}
