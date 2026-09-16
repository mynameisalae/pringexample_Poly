package edu.polytech.springexample.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor 
@NoArgsConstructor 


/**
 * Here is our Model (from MVC)
 * We consider fictional characters
 * We annotate with @Entity (from jakarta persistence)
 * Jakarta Persistence defines a standard for
 * management of persistence and object/relational mapping
 * in Java(R) environments.
 * see https://jakarta.ee/specifications/persistence/
 */
@Entity
public class FictionalCharacter {

    /**
     * The following annotation allow to identify
     * the variable as the ID for the database
     * and the strategy to generate ID
     */
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String firstname;
    private String lastname;
    private String univers ;


}