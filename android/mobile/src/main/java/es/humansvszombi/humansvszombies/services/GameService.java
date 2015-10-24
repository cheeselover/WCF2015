package es.humansvszombi.humansvszombies.services;

import java.util.List;

import es.humansvszombi.humansvszombies.models.Game;
import retrofit.Call;
import retrofit.http.GET;
import retrofit.http.Path;

/**
 * Created by daniel on 2015-10-24.
 */
public interface GameService {
    @GET("/games")
    Call<List<Game>> all();

    @GET("/games/{id}")
    Call<Game> get(@Path("id") int id);
}
