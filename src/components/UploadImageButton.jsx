import React from "react";
import PropTypes from "prop-types";
import Uploady, { useItemFinishListener } from "@rpldy/uploady";
import UploadButton from "@rpldy/upload-button";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../reducers/usersReducer";

const FinishListener = ({ newUrl }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.loggedInUser);

  useItemFinishListener(() => {
    const newUserImages = [newUrl];
    const newUser = {
      ...user,
      user_images: newUserImages,
    };
    dispatch(updateUser(user.id, newUser));
  });
};

function UploadImageButton({ item }) {
  const user = useSelector((state) => state.loggedInUser);
  UploadImageButton.propTypes = {
    item: PropTypes.shape({
      latin: PropTypes.string.isRequired,
      common: PropTypes.arrayOf(PropTypes.string).isRequired,
      description: PropTypes.shape({
        cap: PropTypes.string.isRequired,
        gills: PropTypes.string.isRequired,
        stem: PropTypes.string.isRequired,
        flesh: PropTypes.string.isRequired,
        spores: PropTypes.string.isRequired,
      }),
      habitat: PropTypes.string.isRequired,
      flavour: PropTypes.string.isRequired,
      frequency: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      image_gs: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired,
  };

  const url = `https://greyscaleimages.s3.amazonaws.com/${item.latin.replace(/\s+/g, "")}-${
    user.username
  }.jpg`;

  console.log("url :>> ", url);

  return (
    <Uploady
      destination={{
        url: "https://greyscaleimages.s3.amazonaws.com/",
        headers: { ContentType: "image/jpeg" },
      }}
      params={{
        key: `${item.latin.replace(/\s+/g, "")}-${user.username}.jpg`,
        Metadata: { OrgID: "BLAH" },
      }}
    >
      <FinishListener newUrl={url} />
      <UploadButton />
    </Uploady>
  );
}

export default UploadImageButton;
