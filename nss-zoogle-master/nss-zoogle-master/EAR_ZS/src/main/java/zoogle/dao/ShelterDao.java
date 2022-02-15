/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package zoogle.dao;

import org.springframework.stereotype.Repository;
import zoogle.model.EmployeeState;
import zoogle.model.Shelter;
import zoogle.model.ShelterEmployee;

import javax.persistence.NoResultException;
import java.util.List;

/**
 *
 * @author Hp
 */
@Repository
public class ShelterDao extends BaseDao<Shelter> {

    public ShelterDao() {
        super(Shelter.class);
    }

    public List<Shelter> findUnapprovedShelters() {
        try {
            return em.createNamedQuery("Shelter.findUnapproved", Shelter.class)
                    .getResultList();
        } catch (NoResultException e) {
            return null;
        }
    }

}
