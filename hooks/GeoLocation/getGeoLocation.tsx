import { useEffect, useState } from "react";

type Response = {
  position: GeolocationPosition;
  error: string | null;
};
export const getGeoLocation = (): {
  position: GeolocationPosition | undefined | null;
  error: string | null | undefined;
} => {
  const [position, setPosition] = useState<GeolocationPosition | null>();
  const [error, setError] = useState<string | null>();

  const onChange: PositionCallback = (position: GeolocationPosition) => {
    setPosition(position);
  };

  const onError: PositionErrorCallback = (
    positionError: GeolocationPositionError
  ) => {
    setError(positionError.message);
  };

  useEffect(() => {
    const geo: Geolocation = navigator.geolocation;

    if (!geo) {
      setError("Unauthorise");
    }
    geo.watchPosition(onChange, onError);
  }, []);

  return { position, error };
};
