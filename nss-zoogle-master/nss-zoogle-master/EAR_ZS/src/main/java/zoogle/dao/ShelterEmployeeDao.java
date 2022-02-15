/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package zoogle.dao;

import org.springframework.stereotype.Repository;
import zoogle.model.EmployeeState;
import zoogle.model.ShelterEmployee;
import zoogle.model.User;

import javax.persistence.NoResultException;
import zoogle.model.Shelter;

import java.util.List;

@Repository
public class ShelterEmployeeDao extends BaseDao<ShelterEmployee> {

    public ShelterEmployeeDao() {
        super(ShelterEmployee.class);
    }


    public User findByUsername(String login) {
        try {
            return em.createNamedQuery("ShelterEmployee.findByUsername", User.class).setParameter("login", login)
                    .getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
    }

    public List<ShelterEmployee> findByShelter(Shelter shelter) {
        try {
            return em.createNamedQuery("ShelterEmployee.findByShelter", ShelterEmployee.class)
                    .setParameter("shelter", shelter)
                    .setParameter("state", EmployeeState.WAITING)
                    .getResultList();
        } catch (NoResultException e) {
            return null;
        }
    }
    
    public ShelterEmployee findByUsernameAndShelter(User user, Shelter shelter) {
        try {
            return em.createNamedQuery("ShelterEmployee.findRelation", ShelterEmployee.class)
                    .setParameter("user", user)
                    .setParameter("shelter", shelter)
                    .getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
    }
}
