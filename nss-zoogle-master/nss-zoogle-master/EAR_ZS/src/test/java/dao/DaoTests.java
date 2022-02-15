/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dao;


import zoogle.model.User;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import static org.junit.Assert.*;


/**
 *
 * @author Hp
 */
public class DaoTests extends BaseDaoTests {
//    private static EntityManagerFactory emf;
    
    @PersistenceContext
    private EntityManager em;
    
    
    @BeforeClass
    public static void setUpClass() {
//        emf = Persistence.createEntityManagerFactory("PersistenceUnit");
//        em = emf.createEntityManager();
    }
    
    @AfterClass
    public static void tearDownClass() {
//        emf.close();
//        em.close();
    }
    
    @Before
    public void setUp() {
    }
    
    @After
    public void tearDown() {
    }

    @Test
    public void hello() {
        System.out.println("HELLLLLOOOO");
        User usr = em.find(User.class, 1);
        assertTrue(true);
    }
    
}
