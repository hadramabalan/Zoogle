/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package zoogle.model;

import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 *
 * @author Hp
 */
@Entity
@Table(name = "ads")
@NamedQueries({
        @NamedQuery(name = "Advert.findAllAds", query = "SELECT a FROM Advert a WHERE a.state != zoogle.model.AdvertState.CLOSED"),
        @NamedQuery(name = "Advert.findByAdByAShelter", query = "SELECT a FROM Advert a WHERE a.shelter = :shelter"),
        @NamedQuery(name = "Advert.findByAdByUser", query = "SELECT a FROM Advert a WHERE a.owner = :user"),
})
public class Advert extends AbstractEntity {
    
    @OneToOne
    @JoinColumn(name="animalId", nullable = false)
    private Animal animal;

    @ManyToOne
    @JoinColumn(name="ownerId")
    private User owner;

    @ManyToOne
    @JoinColumn(name="shelterId")
    private Shelter shelter;
    
    @Temporal(TemporalType.TIMESTAMP)
    private Date dateCreated;
    
    @Basic(optional = false)
    @Column(nullable = false)
    private String description;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AdvertState state;
    
    public Advert(){}
    public Advert(Advert ad){
        this.id = ad.getId();
        this.dateCreated = ad.getDateCreated();
        this.description= ad.getDescription();
        this.state = ad.getState();
        this.animal = ad.getAnimal();
    }
    
    
    public Animal getAnimal() {
        return animal;
    }

    public User getOwner() {
        return owner;
    }

    public Shelter getShelter() {
        return shelter;
    }

    public Date getDateCreated() {
        return dateCreated;
    }

    public String getDescription() {
        return description;
    }

    public AdvertState getState() {
        return state;
    }

    public void setAnimal(Animal animal) {
        this.animal = animal;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    public void setShelter(Shelter shelter) {
        this.shelter = shelter;
    }

    public void setDateCreated(Date dateCreated) {
        this.dateCreated = dateCreated;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setState(AdvertState state) {
        this.state = state;
    }
    
    
}
