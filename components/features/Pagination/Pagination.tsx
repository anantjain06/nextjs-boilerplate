import styles from './Pagination.module.css';
const Pagination = (props: any) => {
  const {
    onPageChange,
    totalCount,
    currentPage,
    pageSize,
    className
  } = props;

  if (currentPage === 0) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    if (currentPage === 1) return
    onPageChange(currentPage - 1);
  };

  const lastPage = Math.ceil(totalCount / pageSize);
  console.log(lastPage,currentPage,totalCount,pageSize)
  return (
    <>
      <ul className={`${styles.paginationContainer} justify-content-center mt-3`}>
        <li className={`${styles.paginationItem} ${(currentPage === 1) ? styles.disabled:null}`} onClick={onPrevious}  >
          <div className={`${styles.arrow} ${styles.left}`} />
        </li>
        <li className={styles.paginationItem} >
          Page : {currentPage}
        </li>
        <li onClick={onNext} className={`${styles.paginationItem} ${(currentPage === lastPage) ? styles.disabled:null}`} >
          <div className={`${styles.arrow} ${styles.right}`} />
        </li>
      </ul>
    </>
  );
};

export default Pagination;