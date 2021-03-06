package in.rohitjaisinghani.onlinebookstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

import in.rohitjaisinghani.onlinebookstore.entity.Book;

@CrossOrigin("http://localhost:4200")
/*crossorigin will allow the host to access outside 8080
if there are multiple host then * is used in round brackets*/
public interface BookRepository extends JpaRepository<Book,Long> {

}
