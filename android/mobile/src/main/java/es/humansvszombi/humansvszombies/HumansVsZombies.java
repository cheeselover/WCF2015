package es.humansvszombi.humansvszombies;

import android.app.Application;
import android.app.DownloadManager;
import android.util.Log;

import com.google.gson.FieldNamingPolicy;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.squareup.okhttp.Interceptor;
import com.squareup.okhttp.OkHttpClient;
import com.squareup.okhttp.Request;
import com.squareup.okhttp.Response;

import java.io.IOException;

import es.humansvszombi.humansvszombies.models.User;
import retrofit.GsonConverterFactory;
import retrofit.Retrofit;

/**
 * Created by daniel on 2015-10-24.
 */
public class HumansVsZombies extends Application {
    private static Retrofit sRetrofit;
    private static User sCurrentUser;

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
                    if (sCurrentUser != null) {
                        Request newRequest = request.newBuilder()
                                .addHeader("Authorization", "Token " + sCurrentUser.getAuthToken())
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

    public static User getCurrentUser() {
        return sCurrentUser;
    }

    public static void setCurrentUser(User currentUser) {
        sCurrentUser = currentUser;
    }
}
