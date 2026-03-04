const Container = ({ children, className = "" }) => {
    return (
        <div className={`max-w-7xl mx-auto flex justify-between 
        text-gray-900 dark:text-gray-100 flex flex-col p-4 px-6 md:px-12 ${className}`}>
            {children}
        </div>
    );
}

export default Container