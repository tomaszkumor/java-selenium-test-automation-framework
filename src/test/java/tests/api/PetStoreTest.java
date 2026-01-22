package tests.api;

import baseTest.BaseTest;
import dataProviders.dataProviders.api.PetStoreDP;
import dataProviders.dataProvidersModels.api.PetStoreModel;
import io.restassured.response.Response;
import models.api.controllerPet.EndpointPet;
import models.api.controllerStore.EndpointStore;
import models.api.controllerUser.EndpointUser;
import models.api.pojo.POJOApiResponse;
import models.api.pojo.POJOOrder;
import models.api.pojo.POJOPet;
import models.api.pojo.POJOUser;
import org.testng.annotations.Test;
import utils.apiBodyComparer.ApiBodyComparer;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

public class PetStoreTest extends BaseTest {
    @Test(dataProvider = "sendGetRequestUserLoginDP", dataProviderClass = PetStoreDP.class)
    public void sendGetRequestUserLoginAndCheckStatusCode(PetStoreModel petStoreModel) {
        Response actualResponse = new EndpointUser().sendGetRequestUserLogin(petStoreModel).getResponse();
        assertThat(actualResponse.getStatusCode()).isEqualTo(200);
    }

    @Test(dataProvider = "sendPostRequestUserDP", dataProviderClass = PetStoreDP.class)
    public void sendPostRequestUserAndCheckResponse(PetStoreModel petStoreModel) {
        POJOApiResponse actualResponse = new EndpointUser().sendPostRequestUser(petStoreModel).getApiResponsePOJO();
        POJOApiResponse expectedResponse = new POJOApiResponse().deserialize(petStoreModel.getApiResponseBodyPath(), POJOApiResponse.class);
        assertThat(ApiBodyComparer.getPrettyLog(actualResponse)).isEqualTo(ApiBodyComparer.getPrettyLog(expectedResponse));
    }

    @Test(dataProvider = "sendGetRequestUserDP", dataProviderClass = PetStoreDP.class)
    public void sendGetRequestUserAndCheckResponse(PetStoreModel petStoreModel) {
        POJOUser actualResponse = new EndpointUser().sendGetRequestUser(petStoreModel).getUserPOJO();
        POJOUser expectedResponse = new POJOUser().deserialize(petStoreModel.getApiResponseBodyPath(), POJOUser.class);
        assertThat(ApiBodyComparer.getPrettyLog(actualResponse)).isEqualTo(ApiBodyComparer.getPrettyLog(expectedResponse));
    }

    @Test(dataProvider = "sendPutRequestUserDP", dataProviderClass = PetStoreDP.class)
    public void sendPutRequestUserAndCheckStatusCode(PetStoreModel petStoreModel) {
        Response actualResponse = new EndpointUser().sendPutRequestUser(petStoreModel).getResponse();
        assertThat(actualResponse.getStatusCode()).isEqualTo(200);
    }

    @Test(dataProvider = "sendDeleteRequestUserDP", dataProviderClass = PetStoreDP.class)
    public void sendDeleteRequestUserAndCheckStatusCode(PetStoreModel petStoreModel) {
        Response actualResponse = new EndpointUser().sendDeleteRequestUser(petStoreModel).getResponse();
        assertThat(actualResponse.getStatusCode()).isEqualTo(200);
    }

    @Test(dataProvider = "sendPostRequestPetDP", dataProviderClass = PetStoreDP.class)
    public void sendPostRequestPetAndCheckStatusCode(PetStoreModel petStoreModel) {
        Response actualResponse = new EndpointPet().sendPostRequestPet(petStoreModel).getResponse();
        assertThat(actualResponse.getStatusCode()).isEqualTo(200);
    }

    @Test(dataProvider = "sendGetRequestPetFindByStatusDP", dataProviderClass = PetStoreDP.class)
    public void sendGetRequestPetFindByStatusAndCheckStatusCode(PetStoreModel petStoreModel) {
        Response actualResponse = new EndpointPet().sendGetRequestPetFindByStatus(petStoreModel).getResponse();
        assertThat(actualResponse.getStatusCode()).isEqualTo(200);
    }

    @Test(dataProvider = "sendGetRequestPetFindByIdDP", dataProviderClass = PetStoreDP.class)
    public void sendGetRequestPetFindByIdAndCheckResponse(PetStoreModel petStoreModel) {
        POJOPet actualResponse = new EndpointPet().sendGetRequestPetFindById(petStoreModel).getPetPOJO();
        POJOPet expectedResponse = new POJOPet().deserialize(petStoreModel.getApiResponseBodyPath(), POJOPet.class);
        assertThat(ApiBodyComparer.getPrettyLog(actualResponse)).isEqualTo(ApiBodyComparer.getPrettyLog(expectedResponse));
    }

    @Test(dataProvider = "sendPutRequestPetDP", dataProviderClass = PetStoreDP.class)
    public void sendPutRequestPetAndCheckStatusCode(PetStoreModel petStoreModel) {
        Response actualResponse = new EndpointPet().sendPutRequestPet(petStoreModel).getResponse();
        assertThat(actualResponse.getStatusCode()).isEqualTo(200);
    }

    @Test(dataProvider = "sendDeleteRequestPetDP", dataProviderClass = PetStoreDP.class)
    public void sendDeleteRequestPetAndCheckStatusCode(PetStoreModel petStoreModel) {
        Response actualResponse = new EndpointPet().sendDeleteRequestPet(petStoreModel).getResponse();
        assertThat(actualResponse.getStatusCode()).isEqualTo(200);
    }

    @Test()
    public void sendGetRequestStoreInventoryAndCheckStatusCode() {
        Response actualResponse = new EndpointStore().sendGetRequestStoreInventory().getResponse();
        assertThat(actualResponse.getStatusCode()).isEqualTo(200);
    }

    @Test(dataProvider = "sendPostRequestStoreOrderDP", dataProviderClass = PetStoreDP.class)
    public void sendPostRequestStoreOrderAndCheckStatusCode(PetStoreModel petStoreModel) {
        Response actualResponse = new EndpointStore().sendPostRequestStoreOrder(petStoreModel).getResponse();
        assertThat(actualResponse.getStatusCode()).isEqualTo(200);
    }

    @Test(dataProvider = "sendGetRequestStoreOrderDP", dataProviderClass = PetStoreDP.class)
    public void sendGetRequestStoreOrderAndCheckResponse(PetStoreModel petStoreModel) {
        POJOOrder actualResponse = new EndpointStore().sendGetRequestStoreOrder(petStoreModel).getOrderPOJO();
        POJOOrder expectedResponse = new POJOOrder().deserialize(petStoreModel.getApiResponseBodyPath(), POJOOrder.class).replaceShipDate(actualResponse);
        assertThat(ApiBodyComparer.getPrettyLog(actualResponse)).isEqualTo(ApiBodyComparer.getPrettyLog(expectedResponse));
    }

    @Test(dataProvider = "sendDeleteRequestStoreOrderDP", dataProviderClass = PetStoreDP.class)
    public void sendDeleteRequestStoreOrderAndCheckStatusCode(PetStoreModel petStoreModel) {
        Response actualResponse = new EndpointStore().sendDeleteRequestStoreOrder(petStoreModel).getResponse();
        assertThat(actualResponse.getStatusCode()).isEqualTo(200);
    }

    @Test()
    public void sendGetRequestUserLogoutAndCheckStatusCode() {
        Response actualResponse = new EndpointUser().sendGetRequestUserLogout().getResponse();
        assertThat(actualResponse.getStatusCode()).isEqualTo(200);
    }
}
