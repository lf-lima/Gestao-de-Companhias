import profilePermissionsSeeder from './profilePermissionsSeeder'

class Seeder {
  private seeders = [
    profilePermissionsSeeder
  ]

  public async run () {
    for (const seeder of this.seeders) {
      await seeder.run()
    }
  }
}

export default new Seeder()
