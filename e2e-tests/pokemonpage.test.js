import { test, describe, expect } from '@playwright/test'

describe("Pokedox",()=>{
    test("must be able to navigate to a pokemons page", async({page})=>{
        await page.goto('/pokemon/charmander')
        await expect(page.getByText('charmander')).toBeVisible()
    })
})