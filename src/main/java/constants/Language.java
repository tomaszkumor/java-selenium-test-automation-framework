package constants;

public enum Language {
    EN("English"),
    AR("Arabic"),
    TR("Turkish"),
    RU("Russian"),
    FR("French"),
    ZH("Chinese"),
    DE("Germany");

    private String language;

    Language(String language) {
        this.language = language;
    }

    public String getLanguage() {
        return language;
    }
}
