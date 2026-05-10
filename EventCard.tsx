import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface EventProps {
  id: string;
  title: string;
  type: string;
  date: string;
  maxTeamSize: number;
  openRoles: string[];
}

export const EventCard = ({ event }: { event: EventProps }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.cardWrapper}>
      <LinearGradient
        colors={['#2a2a2a', '#111111']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.cardBackground}
      >
        <View style={styles.innerBevel}>
          <View style={styles.header}>
            <Text style={styles.title}>{event.title}</Text>
            <View style={styles.badgeWrapper}>
              <LinearGradient colors={['#33280a', '#1a1405']} style={styles.badge}>
                <Text style={styles.badgeText}>{event.type}</Text>
              </LinearGradient>
            </View>
          </View>
          
          <Text style={styles.detailText}>Date: <Text style={styles.detailValue}>{event.date}</Text></Text>
          <Text style={styles.detailText}>Max Team Size: <Text style={styles.detailValue}>{event.maxTeamSize}</Text></Text>
          
          <View style={styles.rolesContainer}>
            <Text style={styles.rolesLabel}>OPEN ROLES</Text>
            <View style={styles.tagsWrapper}>
              {event.openRoles.map((role, idx) => (
                <View key={idx} style={styles.tagWrapper}>
                  <View style={styles.tagInner}>
                    <Text style={styles.tagText}>{role}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          <TouchableOpacity 
            style={styles.joinButtonWrapper} 
            onPress={() => setModalVisible(true)}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#e6c27a', '#b8860b', '#8b6508']}
              locations={[0, 0.5, 1]}
              style={styles.joinButtonGradient}
            >
              <View style={styles.joinButtonInner}>
                <Text style={styles.joinButtonText}>JOIN TEAM</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalWrapper}>
                <LinearGradient colors={['#222', '#111']} style={styles.modalBackground}>
                  <View style={styles.modalInnerBevel}>
                    <Text style={styles.modalTitle}>Join {event.title}</Text>
                    <Text style={styles.modalSubtitle}>How would you like to participate?</Text>
                    
                    <TouchableOpacity 
                      style={styles.modalPrimaryWrapper}
                      onPress={() => setModalVisible(false)}
                      activeOpacity={0.8}
                    >
                      <LinearGradient colors={['#e6c27a', '#b8860b']} style={styles.modalPrimaryGradient}>
                         <View style={styles.modalPrimaryInner}>
                           <Text style={styles.modalPrimaryText}>JOIN AS MEMBER</Text>
                         </View>
                      </LinearGradient>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      style={styles.modalSecondaryWrapper}
                      onPress={() => setModalVisible(false)}
                    >
                      <Text style={styles.modalSecondaryText}>CREATE AS TEAM LEAD</Text>
                    </TouchableOpacity>

                    <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
                      <Text style={styles.closeButtonText}>CANCEL</Text>
                    </Pressable>
                  </View>
                </LinearGradient>
              </View>
            </View>
          </Modal>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.6,
    shadowRadius: 15,
    elevation: 10,
    borderRadius: 20,
  },
  cardBackground: {
    borderRadius: 20,
    padding: 2,
  },
  innerBevel: {
    backgroundColor: '#181818',
    borderRadius: 18,
    padding: 20,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.8)',
    borderRightColor: 'rgba(0, 0, 0, 0.8)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '900',
    color: '#d4af37',
    flex: 1,
    textShadowColor: 'rgba(212, 175, 55, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  badgeWrapper: {
    marginLeft: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#d4af37',
    shadowColor: '#d4af37',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  badgeText: {
    color: '#d4af37',
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  detailText: {
    fontSize: 14,
    color: '#777',
    marginBottom: 6,
    fontWeight: '600',
  },
  detailValue: {
    color: '#ccc',
    fontWeight: '500',
  },
  rolesContainer: {
    marginTop: 16,
    marginBottom: 20,
  },
  rolesLabel: {
    fontSize: 11,
    color: '#555',
    fontWeight: '800',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  tagsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  tagWrapper: {
    backgroundColor: '#0a0a0a',
    borderRadius: 8,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderColor: '#000',
  },
  tagInner: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  tagText: {
    fontSize: 11,
    color: '#aaa',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  joinButtonWrapper: {
    shadowColor: '#d4af37',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    borderRadius: 12,
  },
  joinButtonGradient: {
    borderRadius: 12,
    padding: 2,
  },
  joinButtonInner: {
    backgroundColor: 'transparent',
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 10,
    borderTopWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.5)',
  },
  joinButtonText: {
    color: '#111',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalWrapper: {
    width: '100%',
    maxWidth: 400,
    shadowColor: '#d4af37',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 30,
    elevation: 10,
    borderRadius: 24,
  },
  modalBackground: {
    borderRadius: 24,
    padding: 2,
  },
  modalInnerBevel: {
    backgroundColor: '#181818',
    borderRadius: 22,
    padding: 24,
    alignItems: 'center',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#d4af37',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 13,
    color: '#888',
    marginBottom: 30,
    textAlign: 'center',
  },
  modalPrimaryWrapper: {
    width: '100%',
    marginBottom: 16,
    borderRadius: 12,
    shadowColor: '#d4af37',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  modalPrimaryGradient: {
    borderRadius: 12,
    padding: 2,
  },
  modalPrimaryInner: {
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 10,
    borderTopWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  modalPrimaryText: {
    color: '#111',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 1,
  },
  modalSecondaryWrapper: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#0a0a0a',
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderColor: '#000',
  },
  modalSecondaryText: {
    color: '#d4af37',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1,
  },
  closeButton: {
    paddingTop: 12,
    paddingBottom: 4,
  },
  closeButtonText: {
    color: '#555',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
});
