const Loading = ({ 
variant = 'spinner', 
size = 'md',
message = 'Cargando...',
fullScreen = false,
color = 'blue'
}) => {
  // Mapeo de tamaños
const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-12 w-12',
    lg: 'h-20 w-20',
    full: 'min-h-screen'
};
  // Mapeo de colores
const colorClasses = {
    blue: 'border-blue-600',
    green: 'border-green-600',
    purple: 'border-purple-600',
    red: 'border-red-600'
};
const SpinnerLoading = () => (
    <div className={`flex flex-col items-center justify-center ${fullScreen ? sizeClasses.full : 'p-8'}`}>
    <div 
        className={`
        animate-spin 
        rounded-full 
        border-b-2 
        ${sizeClasses[size]} 
        ${colorClasses[color]}
        `}
        role="status"
        aria-label="Cargando"
    />
    {message && (
        <p className="mt-4 text-gray-600 text-sm md:text-base animate-pulse">
        {message}
        </p>
    )}
    </div>
);
const SkeletonLoading = () => (
    <div className="space-y-4 p-4 animate-pulse">
      {/* Skeleton para título */}
    <div className="h-8 bg-gray-200 rounded w-3/4"></div>
    
      {/* Skeleton para párrafos */}
    <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-4/6"></div>
    </div>

      {/* Skeleton para imagen */}
    <div className="h-48 bg-gray-200 rounded"></div>

      {/* Skeleton para botones */}
    <div className="flex gap-3">
        <div className="h-10 bg-gray-200 rounded w-24"></div>
        <div className="h-10 bg-gray-200 rounded w-24"></div>
    </div>
    </div>
);

const ProgressLoading = () => (
    <div className={`flex flex-col items-center justify-center ${fullScreen ? sizeClasses.full : 'p-8'}`}>
    <div className="w-full max-w-md">
        {message && (
        <p className="text-gray-600 text-sm mb-2">{message}</p>
        )}
        
        {/* Barra de progreso con animación */}
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div 
            className={`h-full bg-${color}-600 rounded-full animate-progress`}
            style={{
            animation: 'progress 2s ease-in-out infinite'
            }}
        />
        </div>
    </div>

    <style jsx>{`
        @keyframes progress {
        0% {
            width: 0%;
            margin-left: 0%;
        }
        50% {
            width: 50%;
            margin-left: 25%;
        }
        100% {
            width: 0%;
            margin-left: 100%;
        }
        }
    `}</style>
    </div>
);
const DotsLoading = () => (
    <div className="flex items-center justify-center space-x-2 p-4">
    <div 
        className={`w-3 h-3 bg-${color}-600 rounded-full animate-bounce`}
        style={{ animationDelay: '0ms' }}
    />
    <div 
        className={`w-3 h-3 bg-${color}-600 rounded-full animate-bounce`}
        style={{ animationDelay: '150ms' }}
    />
    <div 
        className={`w-3 h-3 bg-${color}-600 rounded-full animate-bounce`}
        style={{ animationDelay: '300ms' }}
    />
    </div>
);

  // ============== RENDER SEGÚN VARIANTE ====================

const variants = {
    spinner: <SpinnerLoading />,
    skeleton: <SkeletonLoading />,
    progress: <ProgressLoading />,
    dots: <DotsLoading />
};

return variants[variant] || <SpinnerLoading />;
};

// ============== COMPONENTES ESPECIALIZADOS ====================

export const FullScreenLoading = ({ message = 'Cargando...' }) => (
<Loading 
    variant="spinner" 
    size="lg" 
    message={message}
    fullScreen={true}
/>
);

/**
 * Loading para botones
 */
export const ButtonLoading = ({ size = 'sm' }) => (
<div className="inline-flex items-center">
    <div className={`animate-spin rounded-full border-b-2 border-white ${
    size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'
    }`} />
</div>
);

/**
 * Loading para listas (skeleton múltiple)
 */
export const ListLoading = ({ count = 3 }) => (
<div className="space-y-4">
    {Array.from({ length: count }).map((_, index) => (
    <div key={index} className="animate-pulse flex space-x-4 p-4 bg-gray-50 rounded-lg">
        <div className="rounded-full bg-gray-200 h-12 w-12"></div>
        <div className="flex-1 space-y-3 py-1">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
        </div>
    </div>
    ))}
</div>
);
export default Loading;
