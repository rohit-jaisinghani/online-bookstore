package in.rohitjaisinghani.onlinebookstore.repository;



import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import in.rohitjaisinghani.onlinebookstore.entity.Book;


/*crossorigin will allow the host to access outside 8080
if there are multiple host then * is used in round brackets*/
public interface BookRepository extends JpaRepository<Book,Long> {
	
	
	//to override the rest end points use RestResource
	@RestResource(path="categoryid")
	Page<Book> findByCategoryId(@Param("id")Long id,Pageable pageable);
	
	//'containing' works like 'LIKE' operator 
	@RestResource(path="searchbykeyword")
	Page<Book> findByNameContaining(@Param("name")String keyword,Pageable pageable);
}
