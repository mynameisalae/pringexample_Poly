//every fonction the needs a bd connection are here how to create findByUniver 


package edu.polytech.springexample.repository;

import edu.polytech.springexample.model.FictionalCharacter;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CharacterRepo extends JpaRepository<FictionalCharacter, Long> {
    FictionalCharacter findByLastname(String lastname);
}
