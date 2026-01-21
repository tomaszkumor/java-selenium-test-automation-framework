package utils.apiBodyComparer;

import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.NoArgsConstructor;
import lombok.SneakyThrows;

@NoArgsConstructor
public class ApiBodyComparer {
    @SneakyThrows
    public static <T> String getAssertionLog(T actual, T expected) {
        ObjectMapper mapper = new ObjectMapper();
        mapper.enable(SerializationFeature.INDENT_OUTPUT);
        String actualResult = mapper.writeValueAsString(actual);
        String expectedResult = mapper.writeValueAsString(expected);

        return String.format("%n%nActual result: %n%s%n%nExpected result: %n%s", actualResult, expectedResult);
    }

    @SneakyThrows
    public static <T> String getPrettyLog(T pojo) {
        ObjectMapper mapper = new ObjectMapper();
        mapper.enable(SerializationFeature.INDENT_OUTPUT);

        return mapper.writeValueAsString(pojo);
    }
}
