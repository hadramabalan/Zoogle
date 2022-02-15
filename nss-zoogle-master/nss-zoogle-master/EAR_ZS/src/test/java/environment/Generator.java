package environment;

import zoogle.model.User;

import java.util.Date;
import java.util.Random;

public class Generator {

    private static final Random RAND = new Random();

    private static int randomInt() {
        return RAND.nextInt();
    }

    private static boolean randomBoolean() {
        return RAND.nextBoolean();
    }

    public static User generateUser() {
        final User user = new User();
        user.setFirstname("firstName" + randomInt());
        user.setLastname("lastName" + randomInt());
        user.setLogin("login" + randomInt());
        user.setPass(Integer.toString(randomInt()));
        user.setPhone(Integer.toString(randomInt()));
        user.setAdmin(false);
        return user;
    }
}
