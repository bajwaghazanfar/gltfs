import React, { useState, useCallback, useEffect } from "react";
import {
  AddressAutofill,
  AddressMinimap,
  useConfirmAddress,
  config,
  SearchBox,
} from "@mapbox/search-js-react";

import { MAPBOX_ACCESS_TOKEN } from "@/constants/MapBoxAccessToken";
import { useStore } from "@/store/store";
import { generateMarker } from "@/utils/Map/generateIconLayer";
type Props = {
  formik: any;
  fieldValue: string;
};
export default function AddressSearch({ formik, fieldValue }: Props) {
  const [value, setValue] = React.useState("");
  const { snapToTrip, addNewLayer, hideAllLayers } = useStore(
    (store) => store.actions
  );

  const handleRetrieve = (res) => {
    const features = res.features[0];
    const coordinates = features.geometry.coordinates;
    snapToTrip(coordinates[0], coordinates[1], 0, 20);
    formik.setFieldValue(fieldValue, [coordinates[0], coordinates[1]]);

    const layer = generateMarker(coordinates[0], coordinates[1], fieldValue);

    addNewLayer(layer);
  };
  return (
    <>
      <SearchBox
        accessToken={MAPBOX_ACCESS_TOKEN}
        onRetrieve={handleRetrieve}
        value={value}
        onChange={(e) => {
          setValue(e);
        }}
      />

      {formik.touched[fieldValue] && formik.errors[fieldValue] ? (
        <div className="w-3/4 h-fit">
          <p className="font-bold text-red-600 ">{formik.errors[fieldValue]}</p>
        </div>
      ) : null}
    </>
  );
}
