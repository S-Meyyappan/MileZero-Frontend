export default function VehicleImageCard({
    imageUrl,
    image,
    onImageChange,
    disabled
}) {

    return (

        <div className="card border-0 shadow-sm rounded-4">

            <div className="card-body p-4">
                <h5 className="fw-bold mb-4">Vehicle Image</h5>
                <div className="text-center">
                    <img src={ image ? URL.createObjectURL(image): imageUrl || "https://placehold.co/800x500"}
                        alt="Vehicle"
                        className="img-fluid rounded-4"
                        style={{
                            maxHeight: "350px",
                            width: "100%",
                            objectFit: "cover"
                        }}
                    />

                    {!disabled && (
                        <div className="mt-3">
                            <input type="file" className="form-control" accept="image/*"
                                onChange={(e) =>  onImageChange( e.target.files?.[0] || null)}
                            />
                            <div className="text-muted small mt-2">
                                Select one image to replace the current image.
                            </div>
                        </div>
                    )}

                </div>

            </div>

        </div>

    );
}