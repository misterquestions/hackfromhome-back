
class Core {
  public initialize() {

  }
}


/*
*   Application boot
*   
*   Here the application main instance its created, we initialize and handle main process.
*   Make sure not to create two or more instances of core class.
*
*/
const application: Core = new Core();

application.initialize();