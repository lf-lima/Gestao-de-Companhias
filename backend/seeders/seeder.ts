import profilePermissionsSeeder from './profilePermissionsSeeder'

class Seeder {
  private seeders = [
    profilePermissionsSeeder
  ]

  public async run () {
    for (const seeder of this.seeders) {
      await seeder.run()
    }
    console.log('SEEDERS OK')
  }
}

export default new Seeder()
