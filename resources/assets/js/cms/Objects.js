/**
 * Import your models(Entities) in here 
 * These models are then automatically available everywhere in vue.
 * 
 */


import Entity from './Models/Entity';
import Mentor from "./Models/Mentor";
import Youth from "./Models/Youth";
import Candidate from "./Models/Candidate";
import Partner from "./Models/Partner";
import TeamMember from "./Models/TeamMember";
import Section from "./Models/Section";

/**
 * define your models in the models object
 */
window.models = {
	entity: Entity,
	mentor: Mentor,
	youth: Youth,
	candidate: Candidate,
	partner: Partner,
	teamMember: TeamMember,
	section: Section,
};