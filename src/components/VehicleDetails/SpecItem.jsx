function SpecItem({

    icon: Icon,
    label,
    value

}) {

    return (

        <div className="col-lg-2 col-md-4 col-6">
            <div className="card border-0 shadow-sm rounded-4 h-100">
                <div className="card-body text-center">

                    <Icon size={28} className="text-primary mb-3"/>

                    <div className="small text-secondary">
                        {label}
                    </div>

                    <div className="fw-semibold mt-1">
                        {value}
                    </div>
                    
                </div>
            </div>
        </div>

    );

}

export default SpecItem;