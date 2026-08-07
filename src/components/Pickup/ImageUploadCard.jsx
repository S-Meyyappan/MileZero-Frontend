import { useRef } from "react";

import {
    IconCamera,
    IconPhotoPlus,
    IconTrash
} from "@tabler/icons-react";

export default function ImageUploadCard({
    images,
    onImagesChange,
    loading = false
}) {

    const inputRef = useRef(null);

    const handleSelect = (e) => {

        const files = Array.from(e.target.files);

        if (!files.length) return;

        onImagesChange([
            ...images,
            ...files
        ]);

        e.target.value = "";

    };

    const removeImage = (index) => {

        onImagesChange(
            images.filter((_, i) => i !== index)
        );

    };

    return (

        <div className="card border-0 shadow-sm rounded-4">

            <div className="card-body p-4">

                <div className="d-flex align-items-center mb-4">

                    <IconCamera
                        size={28}
                        className="text-primary me-2"
                    />

                    <h5 className="fw-bold mb-0">

                        Vehicle Images

                    </h5>

                </div>

                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    hidden
                    disabled={loading}
                    onChange={handleSelect}
                />

                <div
                    className="border border-2 border-dashed rounded-4 p-5 text-center bg-light cursor-pointer"
                    style={{ cursor: "pointer" }}
                    onClick={() => inputRef.current.click()}
                >

                    <IconPhotoPlus
                        size={52}
                        className="text-primary mb-3"
                    />

                    <h6 className="fw-semibold">

                        Click to upload images

                    </h6>

                    <small className="text-muted">

                        Upload one or multiple vehicle photos

                    </small>

                </div>

                {

                    images.length > 0 && (

                        <div className="row g-3 mt-3">

                            {

                                images.map((image, index) => (

                                    <div
                                        className="col-md-3 col-sm-4 col-6"
                                        key={index}
                                    >

                                        <div className="position-relative border rounded-4 overflow-hidden">

                                            <img
                                                src={URL.createObjectURL(image)}
                                                className="img-fluid"
                                            />

                                            <button
                                                type="button"
                                                className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2 rounded-circle"
                                                onClick={() => removeImage(index)}
                                            >

                                                <IconTrash size={14} />

                                            </button>

                                        </div>

                                    </div>

                                ))

                            }

                        </div>

                    )

                }

            </div>

        </div>

    );

}