package es.humansvszombi.humansvszombies.services;

import es.humansvszombi.humansvszombies.models.Participation;
import retrofit.Call;
import retrofit.http.FormUrlEncoded;
import retrofit.http.PUT;
import retrofit.http.Path;

/**
 * Created by daniel on 2015-10-24.
 */
public interface ParticipationService {
    @PUT("/participations/{id}")
    Call<Participation> update(@Path("id") int id);
}
