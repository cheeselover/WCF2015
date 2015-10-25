package es.humansvszombi.humansvszombies.models;

/**
 * Created by siva on 2015-10-24.
 */
public class Participation {
    private int id, gameId, userId;
    private String userType, stunEndTime, weapon;
    private boolean active;

    public int getId() {
        return id;
    }

    public int getGameId() {
        return gameId;
    }

    public void setGameId(int gameId) {
        this.gameId = gameId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }

    public String getStunEndTime() {
        return stunEndTime;
    }

    public void setStunEndTime(String stunEndTime) {
        this.stunEndTime = stunEndTime;
    }

    public String getWeapon() {
        return weapon;
    }

    public void setWeapon(String weapon) {
        this.weapon = weapon;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}
