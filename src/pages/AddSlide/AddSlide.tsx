import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AddNewSlide } from "src/components";
import { useAppSelector } from "src/store/hooks";

interface AddSlideProps {
  edit?: boolean;
}

export const AddSlide = ({ edit }: AddSlideProps): JSX.Element => {
  const slides = useAppSelector((store) => store.slides.slides);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (edit) {
      const id = location.pathname.replace("/edit/", "");
      const elementToEdit = slides.find((el) => el.id === id);
      if (!elementToEdit) {
        navigate("/");
      }
    }
  }, [edit, location.pathname, navigate, slides]);

  return <AddNewSlide edit={edit} />;
};
