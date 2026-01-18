package constants;

import lombok.Getter;

@Getter
public enum Date {
    YEAR("year"),
    MONTH("month"),
    DAY("day");

    private String name;

    Date(String name) {
        this.name = name;
    }
}
