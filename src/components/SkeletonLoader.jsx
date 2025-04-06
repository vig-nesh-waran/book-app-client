import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function SkeletonLoader() {
  return (
    <div
      className="card p-3 d-flex justify-content-evenly align-items-center"
      style={{ height: "34rem" }}
    >
      <Skeleton height={200} width={180} /> {/* Image Placeholder */}
      <div className="card-body text-center">
        <h5 className="card-title">
          <Skeleton width={120} />
        </h5>
        <div className="card-text">
          <Skeleton width={180} />
        </div>
        <div className="card-text d-flex flex-row align-items-center justify-content-between">
          <Skeleton width={50} height={20} /> {/* Star Placeholder */}
          <Skeleton width={60} height={20} /> {/* Price Placeholder */}
        </div>
      </div>
      <Skeleton width={120} height={40} /> {/* Button Placeholder */}
    </div>
  );
}

export default SkeletonLoader;
