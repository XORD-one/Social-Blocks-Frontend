/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";

const ImportImage = styled("div")<{ withBorder: boolean; circleShape }>(
  ({ theme, withBorder, circleShape }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: circleShape ? "100%" : "fit-content",
    width: "100%",
    // @ts-ignore
    border: "solid 3px " + alpha(theme.palette.text.primary, 0.5),
    borderRadius: circleShape ? "100%" : "5px",
    // @ts-ignore
    backgroundColor: theme.palette.background.default,
    marginTop: "-22px",
    cursor: "pointer",
  })
);

type Props = {
  children?: React.ReactNode;
  onFileSelect: (file: CustomFile) => void;
  previewImage?: string;
  circleShape?: boolean;
};

interface PreviewImageParams {
  src: string;
  height: number;
  width: number;
}

export interface CustomFile extends File {
  buffer: ArrayBuffer;
}

/**
 * MAIN COMPONENT
 * - responsible for manage file uploads
 */
const FieldFileInput: React.FC<Props> = (props) => {
  const [previewImage, setPeviewImage] = useState<string | null>(
    props?.previewImage ? props.previewImage : null
  );
  const onChange = (e: any) => {
    if ((e.target as HTMLInputElement).files && e.target.files[0]) {
      props.onFileSelect(e.target.files[0]);
      let reader = new FileReader();

      reader.onload = (e) => {
        const image = new Image();

        image.src = e.target?.result as string;

        image.onload = function () {
          // const width = (this as any).width;
          // const height = (this as any).height;

          setPeviewImage(e.target?.result as string);
        };
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <React.Fragment>
      <input
        id="file"
        onClick={(e) => e.stopPropagation()}
        type="file"
        accept=".jpg, .png, .jpeg"
        onChange={onChange}
      />
      <label onClick={(e) => e.stopPropagation()} htmlFor="file">
        <ImportImage
          withBorder={!Boolean(previewImage)}
          circleShape={props.circleShape}
        >
          {!previewImage ? (
            props.children || (
              <h3 style={{ padding: "30px 0px" }}>Select Image.</h3>
            )
          ) : (
            <img
              style={{
                height: "100%",
                width: "100%",
                // backgroundImage: `url(${previewImage})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
                borderRadius: props.circleShape ? "100%" : "3px",
              }}
              src={previewImage}
            />
          )}
        </ImportImage>
      </label>
    </React.Fragment>
  );
};

export default FieldFileInput;
