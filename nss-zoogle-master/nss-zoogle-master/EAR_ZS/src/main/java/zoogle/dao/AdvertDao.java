/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package zoogle.dao;

import java.util.List;
import javax.persistence.NoResultException;
import org.springframework.stereotype.Repository;
import zoogle.model.Advert;
import zoogle.model.AdvertState;
import zoogle.model.Shelter;
import zoogle.model.User;

import javax.persistence.NamedQuery;
import java.util.List;

@Repository
public class AdvertDao extends BaseDao<Advert> {

    public AdvertDao() {
        super(Advert.class);
    }


    public List<Advert> findAll() {
        return em.createNamedQuery("Advert.findAllAds", Advert.class)
                .getResultList();
    }

    public List<Advert> findByAdByAShelter(Shelter shelter) {
        return em.createNamedQuery("Advert.findByAdByAShelter", Advert.class)
                .setParameter("shelter", shelter)
                .getResultList();
    }

    public List<Advert> findByAdByUser(User user) {
        return em.createNamedQuery("Advert.findByAdByUser", Advert.class)
                .setParameter("user", user)
                .getResultList();
    }

    public List<Advert> getAdsByShelter(Shelter shelter) {
        return em.createNamedQuery("Advert.findByAdByAShelter", Advert.class)
                .setParameter("shelter", shelter)
                .getResultList();
    }
}