import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable } from 'react-native';
import { MotionButton } from './MotionButton';

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
      <View style={styles.cardBackground}>
        <View style={styles.header}>
          <Text style={styles.title}>{event.title}</Text>
          <View style={styles.badgeWrapper}>
            <Text style={styles.badgeText}>{event.type}</Text>
          </View>
        </View>
        
        <Text style={styles.detailText}>Date: <Text style={styles.detailValue}>{event.date}</Text></Text>
        <Text style={styles.detailText}>Max Team Size: <Text style={styles.detailValue}>{event.maxTeamSize}</Text></Text>
        
        <View style={styles.rolesContainer}>
          <Text style={styles.rolesLabel}>OPEN ROLES</Text>
          <View style={styles.tagsWrapper}>
            {event.openRoles.map((role, idx) => (
              <View key={idx} style={styles.tagWrapper}>
                <Text style={styles.tagText}>{role}</Text>
              </View>
            ))}
          </View>
        </View>

        <MotionButton 
          title="JOIN TEAM" 
          variant="primary-orange" 
          onPress={() => setModalVisible(true)} 
        />

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalWrapper}>
              <View style={styles.modalBackground}>
                <Text style={styles.modalTitle}>Join {event.title}</Text>
                <Text style={styles.modalSubtitle}>How would you like to participate?</Text>
                
                <MotionButton 
                  title="JOIN AS MEMBER" 
                  variant="primary-orange" 
                  onPress={() => setModalVisible(false)} 
                  style={{ marginBottom: 12 }}
                />
                
                <MotionButton 
                  title="CREATE AS TEAM LEAD" 
                  variant="solid-black" 
                  onPress={() => setModalVisible(false)} 
                  style={{ marginBottom: 16 }}
                />

                <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
                  <Text style={styles.closeButtonText}>CANCEL</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderRadius: 16,
  },
  cardBackground: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111111',
    flex: 1,
  },
  badgeWrapper: {
    marginLeft: 12,
    backgroundColor: '#FFF0E5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: {
    color: '#FF5A00',
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  detailText: {
    fontSize: 14,
    color: '#888',
    marginBottom: 6,
    fontWeight: '500',
  },
  detailValue: {
    color: '#333',
    fontWeight: '600',
  },
  rolesContainer: {
    marginTop: 16,
    marginBottom: 24,
  },
  rolesLabel: {
    fontSize: 11,
    color: '#888',
    fontWeight: '800',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  tagsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tagWrapper: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  tagText: {
    fontSize: 12,
    color: '#555',
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalWrapper: {
    width: '100%',
    maxWidth: 400,
  },
  modalBackground: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#111111',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 30,
    textAlign: 'center',
  },
  closeButton: {
    paddingTop: 12,
    paddingBottom: 4,
  },
  closeButtonText: {
    color: '#888',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1,
  },
});
