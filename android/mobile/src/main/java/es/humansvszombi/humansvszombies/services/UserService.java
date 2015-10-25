package es.humansvszombi.humansvszombies.services;

import es.humansvszombi.humansvszombies.models.Participation;
import es.humansvszombi.humansvszombies.models.User;
import retrofit.Call;
import retrofit.http.Field;
import retrofit.http.FormUrlEncoded;
import retrofit.http.GET;
import retrofit.http.Header;
import retrofit.http.POST;
import retrofit.http.Path;

/**
 * Created by daniel on 2015-10-24.
 */
public interface UserService {
    @FormUrlEncoded
    @POST("/users/login")
    Call<User> login(@Field("email") String email, @Field("password") String password);

    @GET("/users/me")
    Call<User> me();

    @GET("/users/me")
    Call<User> me(@Header("Authorization") String authorization);

    @GET("/users/{id}/active_game")
    Call<Participation> active_game(@Path("id") int id);
}
