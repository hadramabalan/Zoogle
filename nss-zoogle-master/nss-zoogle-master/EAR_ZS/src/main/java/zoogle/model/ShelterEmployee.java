/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package zoogle.model;

import javax.persistence.*;

@Entity
@Table(name = "shelter_employee")
@NamedQueries({
        @NamedQuery(name = "ShelterEmployee.findByUsername", query = "SELECT u FROM User u WHERE u.login = :login"),
        @NamedQuery(name = "ShelterEmployee.findByShelter",
                query = "SELECT se FROM ShelterEmployee se WHERE se.shelter = :shelter AND se.state = :state"),
        @NamedQuery(name = "ShelterEmployee.findRelation", 
                query = "SELECT u FROM ShelterEmployee u WHERE u.user = :user AND u.shelter = :shelter")
})
public class ShelterEmployee extends AbstractEntity{
    
    @ManyToOne
    @JoinColumn(name="userId" , nullable = false)
    private User user;
    
    @ManyToOne
    @JoinColumn(name="shelterId" , nullable = false)
    private Shelter shelter;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EmployeeState state;

    public ShelterEmployee() {}
    public ShelterEmployee(User user, Shelter shelter, EmployeeState state) {
        this.user = user;
        this.shelter = shelter;
        this.state = state;
    }
    
    public User getUser() {
        return user;
    }

    public Shelter getShelter() {
        return shelter;
    }

    public EmployeeState getState() {
        return state;
    }

    public void setState(EmployeeState state) {
        this.state = state;
    }
}
