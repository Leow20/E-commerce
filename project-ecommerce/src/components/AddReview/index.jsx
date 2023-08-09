import React, { useContext, useEffect, useState } from "react";

//Style
import "./addReview.css";

//Icons
import cross from "../../assets/icons/cross.svg";

import StarFill from "../../assets/icons/star-fill.svg";
import Star from "../../assets/icons/star.svg";
import { AiOutlinePlus } from "react-icons/ai";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { UserContext } from "../../Contexts/user";
import { ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../../firebaseConnection";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddReview = ({ isOpen, product }) => {
  const { user } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [firstTime, setFirstTime] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewDescription, setReviewDescription] = useState("");
  const [reviewImages, setReviewImages] = useState([]);
  const [show, setShow] = useState("page-wrapper-modal-info");

  const navigate = useNavigate();

  const q = query(collection(db, "reviews"));

  const checkIfUserReviewedProduct = async () => {
    const reviewsRef = collection(db, "reviews");
    const qRef = query(
      reviewsRef,
      where("uid", "==", user.uid),
      where("product", "==", product.id)
    );

    const querySnapshot = await getDocs(qRef);

    return !querySnapshot.empty; // Retorna true se o usuário já fez uma avaliação para o mesmo produto
  };

  useEffect(() => {
    if (!firstTime) {
      setFirstTime(true);
    } else {
      setOpen(true);
    }
  }, [isOpen]);

  const handleStarClick = (index) => {
    setRating(index + 1);
  };

  const handleTitleChange = (e) => {
    setReviewTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setReviewDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setReviewImages(files);
  };

  function obterDataFormatada() {
    const dataAtual = new Date();

    const mes = String(dataAtual.getMonth() + 1).padStart(2, "0");
    const dia = String(dataAtual.getDate()).padStart(2, "0");
    const ano = dataAtual.getFullYear();

    return `${mes}/${dia}/${ano}`;
  }

  async function handleAddReview() {
    try {
      let verify = await checkIfUserReviewedProduct();

      if (verify) {
        toast.error("Você não pode avaliar um produto mais de uma vez");
        return;
      }

      if (
        reviewTitle == "" ||
        rating == "" ||
        reviewDescription == "" ||
        reviewImages.length < 1
      ) {
        toast.error("Preencha todos os campos");
        return;
      }

      await addDoc(q, {
        title: reviewTitle,
        rating: rating,
        description: reviewDescription,
        uid: user.uid,
        product: product.id,
        date: obterDataFormatada(),
        nameUser: user.firstName,
      })
        .then(() => {
          if (reviewImages.length > 0) {
            reviewImages.forEach((doc) => {
              const storageRef = ref(
                storage,
                `images/reviews/${product.id}/${user.uid}/${doc.name}`
              );
              uploadBytesResumable(storageRef, doc);
            });
          }
          toast.success("Review enviada com sucesso!");
        })
        .catch((error) => {
          console.log(error);
          toast.error("Erro ao enviar review");
        });
    } catch (error) {
      console.error(error);
    }
  }

  function handleModalState() {
    setShow("page-wrapper-modal-info animate-modal-info");

    setTimeout(() => {
      setOpen(false);
      setShow("page-wrapper-modal-info");
    }, 400);
  }

  return (
    <>
      {open && (
        <div className="page-wrapper-add-review">
          <div className={show}>
            <header className="product-data-header">
              <img
                src={cross}
                alt="Arrow-Back"
                onClick={() => handleModalState()}
              />
              <span>Add Review</span>
            </header>
            <div className="content-rating-review">
              <span>Product Rating</span>
              <div className="product-rating">
                {[...Array(5)].map((_, index) => (
                  <img
                    key={index}
                    src={index < rating ? StarFill : Star}
                    alt="Star"
                    onClick={() => handleStarClick(index)}
                  />
                ))}
              </div>
            </div>
            <div className="review-fields">
              <div>
                <label>Review Title</label>
                <input
                  type="text"
                  value={reviewTitle}
                  onChange={handleTitleChange}
                  placeholder="Enter Title"
                />
              </div>
              <div>
                <label>Review Description</label>
                <textarea
                  value={reviewDescription}
                  onChange={handleDescriptionChange}
                  placeholder="Enter Description"
                />
              </div>
              <div className="container-images-review">
                {reviewImages.map((doc) => (
                  <img src={URL.createObjectURL(doc)} key={doc.name} />
                ))}
                <div className="content-file-review">
                  <label className="custom-file-input">
                    <AiOutlinePlus color="white" size={20} />
                    <input type="file" multiple onChange={handleImageChange} />
                  </label>
                </div>
              </div>
              <button className="button-add-review " onClick={handleAddReview}>
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddReview;
