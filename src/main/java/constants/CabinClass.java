package constants;

import lombok.Getter;

@Getter
public enum CabinClass {
    ECONOMY("Economy"),
    ECONOMY_PREMIUM("Economy Premium"),
    BUSINESS("Business"),
    FIRST("First");

    private String cabinClass;

    CabinClass(String cabinClass) {
        this.cabinClass = cabinClass;
    }
}
