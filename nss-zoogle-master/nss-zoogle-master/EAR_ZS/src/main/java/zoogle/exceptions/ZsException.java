package zoogle.exceptions;

public class ZsException extends RuntimeException {

    public ZsException() {
    }

    public ZsException(String message) {
        super(message);
    }

    public ZsException(String message, Throwable cause) {
        super(message, cause);
    }

    public ZsException(Throwable cause) {
        super(cause);
    }
}
