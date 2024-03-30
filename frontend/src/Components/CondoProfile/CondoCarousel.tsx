import * as React from "react";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { CondoInfo } from "./MyCondos";
import { useNavigate } from "react-router-dom";

interface CondoCarouselProps {
  condos: Array<CondoInfo>;
}

const CondoCarousel = (props: CondoCarouselProps) => {
  const { condos } = props;
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = condos.length;
  const defaultProfilePicturePath = "/Assets/default-property-image.webp";
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div style={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        {condos.map((condo) => {
          const handleOnClick = (
            event: React.MouseEvent<HTMLImageElement, MouseEvent>
          ): void => {
            navigate(`/CondoProfile/${condo.condo.id}`);
          };

          return (
            <Box
              sx={{
                maxWidth: 400,
                p: 2,
                border: "1px solid var(--color4)",
                background: "var(--color1)",
                borderRadius: "5px",
                boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.5)",
              }}
            >
              <Box
                component="img"
                sx={{
                  height: 255,
                  display: "block",
                  maxWidth: 400,
                  overflow: "hidden",
                }}
                src={defaultProfilePicturePath}
                alt="Error retrieving image"
                onClick={handleOnClick}
              />
              <Typography>{condo.condo.id}</Typography>
              <Typography>{condo.createdAt}</Typography>
            </Box>
          );
        })}
      </Box>
      <MobileStepper
        variant="text"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        sx={{
          width: "25%",
          justifyContent: "center",
          transform: "translateX(137%) translateY(40%)",
          bgcolor: "#eeedeb",
        }}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={true}>
            Next
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={true}>
            <KeyboardArrowLeft />
            Back
          </Button>
        }
      />
    </div>
  );
};

export default CondoCarousel;
