{
  inputs.pkgs.url = "github:NixOS/nixpkgs/nixos-24.11";
  inputs.prisma-utils.url = "github:VanCoding/nix-prisma-utils";

  outputs =
    { pkgs, prisma-utils, ... }:
    let
      nixpkgs = import pkgs { system = "x86_64-linux"; };
      prisma =
        (prisma-utils.lib.prisma-factory {
          # inherit nixpkgs;
          pkgs = nixpkgs;
          # just copy these hashes for now, and then change them when nix complains about the mismatch
          prisma-fmt-hash = "sha256-ggfTlnrRle8HorCCPHa23OO3YBQE1A3yPPAvkq4Ki8M="; 
          query-engine-hash = "sha256-VuFWwhnNXlAPDrVM+BD9vj2tJdrSVLBofFLph5LBaR4=";
          libquery-engine-hash = "sha256-PeZ1cfNzzlVGy8y6mqpeXWj7KCPQmaW+5EzsVcX+XG0=";
          schema-engine-hash = "sha256-58Dw7bZGxQ9jeWU6yeBl+BZQagke1079cIAHvYL01Cg=";
        }).fromPnpmLock
          ./back/pnpm-lock.yaml; # <--- path to our pnpm-lock.yaml file that contains the version of prisma-engines
    in
    {
      devShells.x86_64-linux.default = nixpkgs.mkShell {
        buildInputs = with nixpkgs; [
          openssl
          pnpm_10
          nodejs-slim_22
        ];
        shellHook = prisma.shellHook;
      };
    };
}