import { Link } from "react-router-dom";

const EmptyState = ({ emoji = "📭", title, desc, btnLabel, btnTo }) => (
  <div className="flex flex-col items-center justify-center py-20 text-center">
    <p className="text-5xl mb-4">{emoji}</p>
    <h3 className="text-lg font-display font-semibold text-base-content mb-2">{title}</h3>
    {desc && <p className="text-base-content/50 text-sm max-w-xs mb-5">{desc}</p>}
    {btnLabel && btnTo && (
      <Link to={btnTo} className="btn btn-primary btn-sm rounded-xl text-white px-6">
        {btnLabel}
      </Link>
    )}
  </div>
);

export default EmptyState;
