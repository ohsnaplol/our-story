class Room{
    constructor(Name, Description){
        this.Name = Name;
        this.Description = Description;
    }
    
    //connecting rooms
    //list of Portals
    localPortals;

    //actionable items in the room
    localThings;
}

class Thing{
    constructor(Name,Description,canBePocketed = false);

    //canBePocketed is bool for whether this is an inventory item    

    actionables;
    //what can be done on or with this *thing*
}

class Action{
    constructor(Name, Description){
        this.Name = Name;
        this.Description = Description;
    }
    changetoInventory();
    //change to inventory ie if an object breaks or creates a new object

    updateGamestate();
    //update global objectives

}

class Portal{
    constructor(Description, Destination,JourneyText){
        this.Description; //what the door looks like
        this.Destination; //link to room 
        this.JourneyText; // what it says when you walk through the door
    }
}

class Creature{
    constructor(Name, Description){
        this.Name = Name;
        this.Description = Description;
    }

    inventory;
    //list of pocketable things

    universalActions;
    //non-item-based actions
}

class Player extends Creature{

}

class NPC extends Creature{

}

class Enemy extends Creature{

    
}