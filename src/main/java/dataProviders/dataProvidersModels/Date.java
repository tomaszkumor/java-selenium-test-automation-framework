package dataProviders.dataProvidersModels;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.Month;

@Data
@AllArgsConstructor
public class Date {
    private String year;
    private Month month;
    private String day;
}