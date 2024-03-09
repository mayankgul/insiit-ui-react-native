import { View, Dimensions } from "react-native";
import { Outlet } from "../../models/outlet.model";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { useEffect, useRef, useState } from "react";
import { FoodOutletItemCard } from "./foodOutletItemCard";
import { useAppDispatch } from "../../services/app/hooks";
import { setActiveCarouselIndex } from "../../services/app/features/outlet.screen";

export const FoodOutletCarousel = ({ data }: { data: Outlet[] }) => {
  const carouselRef = useRef<Carousel<Outlet>>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setActiveCarouselIndex(activeIndex));
  }, [activeIndex]);

  return (
    <View>
      <Carousel
        data={data}
        renderItem={({ item }: { item: Outlet }) => (
          <FoodOutletItemCard item={item} />
        )}
        sliderWidth={Dimensions.get("screen").width * (75 / 100)}
        itemWidth={Dimensions.get("screen").width * (75 / 100)}
        loop
        autoplay
        autoplayInterval={3000}
        pagingEnabled
        inactiveSlideOpacity={0.5}
        inactiveSlideScale={0.8}
        onSnapToItem={(index) => setActiveIndex(index)}
      />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={activeIndex}
        containerStyle={{ paddingVertical: 10, marginBottom: 10 }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          backgroundColor: "white", // Active dot color
        }}
        inactiveDotStyle={{
          backgroundColor: "white", // Inactive dot color
        }}
        inactiveDotOpacity={0.5}
        inactiveDotScale={0.85}
        delayPressInDot={0}
      />
    </View>
  );
};
