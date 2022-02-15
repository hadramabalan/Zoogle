
package zoogle.service;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import zoogle.dao.ShelterDao;
import zoogle.dao.ShelterEmployeeDao;
import zoogle.dao.UserDao;
import zoogle.model.EmployeeState;
import zoogle.model.Shelter;
import zoogle.model.ShelterEmployee;
import zoogle.model.User;
import zoogle.security.UserDetails;

@Service
public class ShelterService {
    
    @PersistenceContext
    private EntityManager em;
    private final ShelterDao dao;
    private final UserDao usrDao;
    private final ShelterEmployeeDao shelEmpDao;
    private final UserService usrServ;
    
    @Autowired
    public ShelterService(ShelterDao dao,UserDao userDao,ShelterEmployeeDao shempDao, UserService userServ) {
        this.dao = dao;
        this.usrDao = userDao;
        this.shelEmpDao = shempDao;
        this.usrServ = userServ;
    }
    
    @Transactional
    public String submitNewShelterRequest(Shelter shel) {
        
        shel.setApproved(false);
        shel.setActive(true);
        dao.persist(shel);
        
        User usrPers = usrServ.getCurrUser();
        
        ShelterEmployee shemp = new ShelterEmployee(usrPers,shel, EmployeeState.ACTIVE);
        shelEmpDao.persist(shemp);
        
        return usrPers.getLogin();
    }
    
    @Transactional
    public List<Shelter> getPrintableShelters() {
        em.flush();
        List<Shelter> shels = new ArrayList();

        for (Shelter u : dao.findAll()){
            if (u.isActive()){
                shels.add(new Shelter(u));
            }
        }
        return shels;
    }

    @Transactional
    public List<Shelter> getPrintableUnApprovedShelters() {
        em.flush();
        List<Shelter> shels = new ArrayList();

        for (Shelter u : dao.findUnapprovedShelters()){

                shels.add(new Shelter(u));

        }
        return shels;
    }
}
