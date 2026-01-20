package dataProviders.dataProvidersModels.hotelsPageModels;

import dataProviders.dataProvidersModels.commonModels.DateModel;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class HotelsPageModel {
    private DateModel expectedCheckInDate;
    private DateModel expectedCheckOutDate;
    private HotelDestinationModel hotelDestination;
    private AccommodationModel accommodation;
    private List<ChildModel> children;
    private String nationality;
}
